
    export type RemoteKeys = 'host/authStore';
    type PackageType<T> = T extends 'host/authStore' ? typeof import('host/authStore') :any;