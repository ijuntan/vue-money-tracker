import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/stores/auth";

export async function authGuard(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) {
    const authStore = useAuthStore();
    
    // Without reloading the page or manually typing the url path, isAuthenticated have the ability to check if the user is authenticated.
    // If manually typing the url path, need to wait for the loadUser function to finish before checking if the user is authenticated.
    if(authStore.isAuthenticated) {
        if(to.meta.authRequired) {
            return next();
        }
        else {
            if(from.name === 'LandingPage' || from.fullPath === '/') {
                return next({ name: 'Private' });
            }
            return next(from.fullPath);
        }
    }

    // Can use loadSession() for a faster loadUser() function. 
    const { session } = await authStore.loadSession();
    if (session) {
        // If the route requires authentication and the user is authenticated, let user access.
        if(to.meta.authRequired) {
            return next();
        }
         // If the route requires no authentication and the user is authenticated, redirect to dashboard or the previous page.
        else {
            if(from.name === 'LandingPage' || from.fullPath === '/') {
                return next({ name: 'Private' });
            }
            return next(from.fullPath);
        }
    }

    // If the user is not authenticated, redirect to the landing page.
    else {
        return next({ name: 'LandingPage' });
    }
}