import * as t from "io-ts";

export namespace CommonFirestore {
  export const Parent = t.type({
    name: t.string,
    area: t.string,
  });

  export const getChild = <T extends t.Mixed>(documentReference: T) =>
    t.type({
      name: t.string,
      deviceRef: documentReference,
      schoolRef: documentReference,
    });

  export const getAlertHistory = <T extends t.Mixed>(timestamp: T) =>
    t.type({
      warningSource: t.boolean,
      gps: getGps(timestamp),
    });

  export const School = t.type({
    name: t.string,
    warnings: t.array(
      t.type({
        body: t.string,
        longitute: t.number,
        latitude: t.number,
      })
    ),
  });

  export const getGps = <T extends t.Mixed>(timestamp: T) =>
    t.type({
      latitude: t.number,
      longitude: t.number,
      time: timestamp,
    });

  export const getDevice = <T extends t.Mixed>(timestamp: T) =>
    t.type({
      gpsLogs: t.array(getGps(timestamp)),
    });

  export const getWarning = <T extends t.Mixed>(timestamp: T) =>
    t.type({
      title: t.string,
      body: t.string,
      longitute: t.number,
      latitude: t.number,
      since: timestamp,
      until: timestamp,
      source: t.string,
    });
}

export namespace CommonFunctions {
  // To avoid unused variable error
  // @ts-ignore
  const Response = t.type({
    status: t.union([t.literal("success"), t.literal("error")]),
    body: t.unknown,
  });
}
