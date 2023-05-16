import dayjs from 'dayjs';
import logger from 'pino';

const log = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level: 'debug',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
