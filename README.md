### What are Subscriptions?

They provide real-time updates from your GraphQL server. Subscription can maintain an active connection to your GraphQL server (most commonly via WebSocket), enabling the server to push updates to the subscription's result.

### Redis. Why? If we have default PubSub from Apollo.

Apollo docs warn that the default implementation is not suitable for production.

Why?

    1. It wouldn’t work with multiple instances of our NestJS server.
    2. It does not scale beyond a few connections.
