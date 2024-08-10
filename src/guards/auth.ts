import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export async function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const authStore = useAuthStore();

    // Without reloading the page or manually typing the url path, isAuthenticated have the ability to check if the user is authenticated.
    // If manually typing the url path, authGuard will run before loadUser(), so isAuthenticated will be false.
    if(authStore.isAuthenticated) {
        if(!to.meta.authRequired) {
            return next({ name: 'Private' });
        } else {
            return next();
        }
    }

    const { session } = await authStore.loadSession();

    if(session) {
        if(!to.meta.authRequired) {
            return next({ name: 'Private' });
        } else {
            return next();
        }
    }

    else {
        if(to.meta.authRequired)
            return next({ name: 'LandingPage' });
        else
            return next();
    }
}
