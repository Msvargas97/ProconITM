import { connect } from 'react-redux'
import App from '../components/App'
import { withNetworkConnectivity } from 'react-native-offline';
import {server} from '../../config';
import { initAction } from '../../actions';
import moment from 'moment'

const mapStateToProps = (state) => ({
  nav: state.nav,
  account : state.account.data,
  network: { isConnected: state.network.isConnected },
});

const mapDispatchToProps = (dispatch) =>({
  init: () => {
    dispatch(initAction()); //crea la base de datos realm si es necesario 
    configureLocale();      //configuración de idioma de 'moment'
  },
  dispatch //necesario para que trabaje el navigation 
})
//AppContainer All app, with network state
export const AppContainer = connect(mapStateToProps,mapDispatchToProps)(withNetworkConnectivity({
  withRedux: true, // It won't inject isConnected as a prop in this case,
  pingServerUrl : server.url,
  timeout : 5000,
  //withExtraHeadRequest : true,
  //checkConnectionInterval : 60000
})(App))

const configureLocale = () => {
  moment.updateLocale('en', {
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre,Noviembre_Diciembre'.split('_'),
      monthsShort: 'Ene._Feb._Mar._Abr._May._Jun._Jul._Ago._Sept._Oct._Nov._Dic.'.split('_'),
      monthsParseExact: true,
      weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mié._Jue._Vie._Sáb.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
      weekdaysParseExact: true,
      longDateFormat: {
          LT: 'HH:mm',
          LTS: 'HH:mm:ss',
          L: 'DD/MM/YYYY',
          LL: 'D MMMM YYYY',
          LLL: 'D MMMM YYYY HH:mm',
          LLLL: 'dddd D MMMM YYYY HH:mm'
      }, calendar: {
          sameDay: function () {
              return '[hoy a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
          },
          nextDay: function () {
              return '[mañana a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
          },
          nextWeek: function () {
              return 'dddd [a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
          },
          lastDay: function () {
              return '[ayer a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
          },
          lastWeek: function () {
              return '[el] dddd [pasado a la' + ((this.hours() !== 1) ? 's' : '') + '] LT';
          },
          sameElse: 'L'
      },
      relativeTime: {
          future: 'en %s',
          past: 'hace %s',
          s: 'unos segundos',
          ss: '%d segundos',
          m: 'un minuto',
          mm: '%d minutos',
          h: 'una hora',
          hh: '%d horas',
          d: 'un día',
          dd: '%d días',
          M: 'un mes',
          MM: '%d meses',
          y: 'un año',
          yy: '%d años'
      },
      dayOfMonthOrdinalParse: /\d{1,2}º/,
      ordinal: '%dº',
      ordinal: function (number) {
          return number + (number === 1 ? 'er' : 'e');
      },
      meridiemParse: /PD|MD/,
      isPM: function (input) {
          return input.charAt(0) === 'M';
      },
      // In case the meridiem units are not separated around 12, then implement
      // this function (look at locale/id.js for an example).
      // meridiemHour : function (hour, meridiem) {
      //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
      // },
      meridiem: function (hours, minutes, isLower) {
          return hours < 12 ? 'PD' : 'MD';
      },
      week: {
          dow: 1, // Monday is the first day of the week.
          doy: 4  // The week that contains Jan 4th is the first week of the year.
      }
  });
//  moment.locale('es'); // change the global locale to Spanish
}