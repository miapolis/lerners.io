use dotenv::dotenv;
use serenity::async_trait;
use serenity::client::bridge::gateway::GatewayIntents;
use serenity::client::{Client, Context, EventHandler};
use serenity::model::event::{GuildMemberUpdateEvent, PresenceUpdateEvent};
use serenity::model::id::UserId;
use serenity::model::prelude::Ready;
use std::str::FromStr;
use std::sync::{Arc, Mutex};

use crate::common::{asset_url, Presence};
use crate::State;

lazy_static! {
    static ref TARGET_USER: String =
        std::env::var("DISCORD_TARGET_USER_ID").expect("No target user specified!");
    static ref TARGET_GUILD: String =
        std::env::var("DISCORD_TARGET_GUILD_ID").expect("No target guild specified!");
}

struct Handler {
    pub state: Arc<Mutex<State>>,
}

impl Handler {
    fn new(state: Arc<Mutex<State>>) -> Self {
        Self { state }
    }
}

#[async_trait]
impl EventHandler for Handler {
    async fn ready(&self, ctx: Context, _: Ready) {
        let user = ctx
            .http
            .get_user(TARGET_USER.parse().unwrap())
            .await
            .expect("Unable to fetch user!");

        self.state.lock().unwrap().username = Some(user.tag());
    }

    async fn guild_member_update(&self, _ctx: Context, e: GuildMemberUpdateEvent) {
        if e.user.id == UserId::from_str(&TARGET_USER).unwrap() {
            self.state.lock().unwrap().username = Some(e.user.tag());
        }
    }

    async fn presence_update(&self, _ctx: Context, p: PresenceUpdateEvent) {
        if p.presence.user_id == UserId::from_str(&TARGET_USER).unwrap() {
            for activity in p.presence.activities {
                if activity.name == "Visual Studio Code" {
                    if let Some(assets) = activity.assets {
                        let details = activity.details.unwrap();
                        let details_value = details.replacen("Editing ", "", 1);
                        let state = activity.state;
                        let state_value =
                            state.and_then(|x| Some(x.replacen("Workspace: ", "", 1)));
                        let timestamp = activity.timestamps.unwrap().start.unwrap();

                        let large_image_url = asset_url(
                            activity.application_id.unwrap(),
                            &assets.large_image.unwrap(),
                        );

                        let presence = Presence {
                            editing: details_value,
                            workspace: state_value.clone(),
                            large_image_url,
                            is_idling: state_value.is_none(),
                            start_timestamp: timestamp as usize,
                        };

                        self.state.lock().unwrap().last_presence = Some(presence);
                    }
                } else {
                    self.state.lock().unwrap().last_presence = None;
                }
            }
        }
    }
}

pub async fn create_bot(state: Arc<Mutex<State>>) {
    dotenv().ok();

    let token = std::env::var("DISCORD_TOKEN").expect("No Discord token specified!");

    let mut client = Client::builder(&token)
        .event_handler(Handler::new(state))
        .intents(GatewayIntents::GUILD_PRESENCES | GatewayIntents::GUILD_MEMBERS)
        .await
        .expect("Error creating client!");

    client.start().await.unwrap();
}
