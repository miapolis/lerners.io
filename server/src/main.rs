#![feature(decl_macro)]

use std::sync::{Arc, Mutex};

mod bot;
mod common;
mod cors;

use common::Presence;
use rocket::routes;
use rocket::State as RocketState;
use rocket_contrib::json::Json;

#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate rocket;

pub struct State {
    pub last_presence: Option<Presence>,
    pub username: Option<String>,
}

struct App {
    pub state: Arc<Mutex<State>>,
}

#[get("/username")]
fn username(state: RocketState<Arc<Mutex<State>>>) -> String {
    state.lock().unwrap().username.as_ref().unwrap().to_string()
}

#[get("/presence")]
fn presence(state: RocketState<Arc<Mutex<State>>>) -> Json<Option<Presence>> {
    let presence = state.lock().unwrap().last_presence.clone();
    Json(presence)
}

#[tokio::main]
async fn main() {
    let app = App {
        state: Arc::new(Mutex::new(State {
            last_presence: None,
            username: None,
        })),
    };

    let state = app.state.clone();
    std::thread::spawn(move || {
        rocket::ignite()
            .mount("/", routes![username, presence])
            .attach(cors::CORS)
            .manage(state)
            .launch();
    });

    bot::create_bot(app.state.clone()).await;
}
