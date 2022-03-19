FROM ekidd/rust-musl-builder:nightly-2021-12-23 AS builder

ADD --chown=rust:rust . ./

RUN cargo build --release

# Final image
FROM alpine:latest
RUN apk update && apk add bash

WORKDIR /

COPY --from=builder /home/rust/src/target/x86_64-unknown-linux-musl/release/server ./

CMD ["/server"]
