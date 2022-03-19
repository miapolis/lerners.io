use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};

lazy_static! {
    static ref ALLOWED_ORIGINS: String =
        std::env::var("CORS_ALLOWED_ORIGINS").expect("No allowed origins specified!");
}

pub struct CORS;

impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    fn on_response(&self, _request: &Request, response: &mut Response) {
        let origin = if cfg!(debug_assertions) {
            "*"
        } else {
            ALLOWED_ORIGINS.as_str()
        };

        response.set_header(Header::new("Access-Control-Allow-Origin", origin));
        response.set_header(Header::new("Access-Control-Allow-Methods", "GET"));
        response.set_header(Header::new(
            "Access-Control-Allow-Headers",
            "X-Requested-With, Origin, Content-Type, Accept, Cache-Control, Authorization",
        ));
    }
}
