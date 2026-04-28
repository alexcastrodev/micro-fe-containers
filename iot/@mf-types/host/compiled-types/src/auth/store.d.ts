import type { Role } from '@core/types';
export interface AuthUser {
    id: number;
    username: string;
    name: string;
    roles: Role[];
}
interface AuthState {
    user: AuthUser | null;
    token: string | null;
    roles: Role[];
    login: (u: string, p: string) => Promise<void>;
    logout: () => void;
    hasRole: (roles: Role[]) => boolean;
}
export declare const useAuth: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<AuthState>, "setState" | "persist"> & {
    setState(partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>), replace?: false | undefined): unknown;
    setState(state: AuthState | ((state: AuthState) => AuthState), replace: true): unknown;
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<AuthState, AuthState, unknown>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: AuthState) => void) => () => void;
        onFinishHydration: (fn: (state: AuthState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<AuthState, AuthState, unknown>>;
    };
}>;
export {};
