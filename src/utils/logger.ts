import * as Sentry from '@sentry/react';

class Logger {
  static error(message: string, context: Record<string, unknown> = {}): void {
    Sentry.captureException(new Error(message), {
      extra: context,
    });

    if (process.env.NODE_ENV === 'development') {
      console.error(message, context);
    }
  }

  static warn(message: string, context: Record<string, unknown> = {}): void {
    Sentry.captureMessage(message, {
      level: 'warning',
      extra: context,
    });

    if (process.env.NODE_ENV === 'development') {
      console.warn(message, context);
    }
  }

  static info(message: string, context: Record<string, unknown> = {}): void {
    console.info(message, context);
  }
}

export default Logger;
