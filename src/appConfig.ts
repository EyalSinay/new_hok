export const startTime = new Date("2025-01-01T00:00:00.200Z")
export const diaspora: "0" | "1" = "0";
export const custom: "ashkenazi" | "sephardi" | "edot%20hamizrach" = "edot%20hamizrach";
export const timezone: string = "Asia/Jerusalem";

const appConfig = {
    startTime,
	diaspora,
	custom,
	timezone,
};

export default appConfig;
