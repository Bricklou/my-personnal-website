import dateFns from "date-fns";
import frLocale from "date-fns/locale/fr";

export default {
  formatDate(date) {
    return dateFns.format(date, "[le] DD/MM/YYYY [à] HH:MM", { locale: frLocale });
  },
  formatDateFromNow(date) {
    return dateFns.distanceInWordsToNow(date, { locale: frLocale });
  },
  compareIsBeforeFromNow(date) {
    return dateFns.isBefore(date, new Date());
  }
};