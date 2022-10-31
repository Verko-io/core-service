import { AsyncLocalStorage } from 'async_hooks';

export interface IRequestContext {
  reqId?: string;
  sessionId?: string;

  [key: string]: string;
}

export const globalStore = new AsyncLocalStorage<IRequestContext>();

// Allows easy access to a request's context
export const ctx = (): IRequestContext => {
  const context = globalStore.getStore();
  if (!context) {
    // throw new Error('No context attached to the current req');
  }
  return context;
};

// Allows wrapping a request in a context
export const runWithCtx = (
  fx: (ctx: IRequestContext) => Promise<unknown>,
  context: IRequestContext = {},
) => {
  globalStore.run(context, () => {
    return fx(ctx());
  });
};
