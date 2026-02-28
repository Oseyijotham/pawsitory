export const selectIfLoggedIn = state => state.auth.ifLoggedIn;

export const selectToken = state => state.auth.token;

export const selectIfRegistered = state => state.auth.ifRegistered;

export const selectUser = state => state.auth.user;

export const selectIfRefreshing = state => state.auth.ifRefreshing;

export const selectAll = state => state.auth;

export const selectIfLoading = state => state.auth.ifLoading;