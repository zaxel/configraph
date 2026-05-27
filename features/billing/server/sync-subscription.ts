// Create one reusable sync function.

// Example:

// syncStripeSubscription(subscription)

// Inside:

// extract plan
// extract status
// extract period end
// update DB

// Then ALL webhook events call this function.

// This avoids duplicated logic.