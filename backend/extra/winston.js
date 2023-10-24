import winston from "winston";
import winstonMongoDB from "winston-mongodb";
import DailyRotateFile from "winston-daily-rotate-file";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;



const logger = winston.createLogger({
  transports: [
    new winston.transports.MongoDB({
      level: "info",
      db: "mongodb+srv://mcvagut:mcvagut@cluster0.atstyxx.mongodb.net/?retryWrites=true&w=majority",
      options: {
        useUnifiedTopology: true,
      },
      collection: "logs",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    new DailyRotateFile({
      filename: "Logs.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new transports.Console(),
  ],
});

export default logger;