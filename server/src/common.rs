use serenity::model::id::ApplicationId;
use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct Presence {
    pub editing: String,
    pub workspace: Option<String>,
    pub large_image_url: String,
    pub is_idling: bool,
    pub start_timestamp: usize,
}

pub fn asset_url(application_id: ApplicationId, asset_id: &str) -> String {
    format!(
        "https://cdn.discordapp.com/app-assets/{}/{}.png",
        application_id, asset_id
    )
}
