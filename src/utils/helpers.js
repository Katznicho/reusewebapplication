export function convertFirebaseTimestampToReadableDate(timestampObj) {
    const timestamp = new Date(timestampObj.seconds * 1000 + timestampObj.nanoseconds / 1e6);
    return timestamp.toLocaleString(); // You can use other toLocaleString options to format the date/time as you prefer
  }