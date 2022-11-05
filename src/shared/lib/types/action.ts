export type Action<T extends any = any> = { type: string; payload: T };

export type ActionHandler<T extends any> = (state: T, actions: Action) => T;
