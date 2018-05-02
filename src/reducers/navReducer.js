import { AppNavigator } from '../navigator'
import Toast from 'react-native-simple-toast'

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Main'));

const navReducer = (state = initialState, action) => {
    if (action.type.startsWith('Navigation/')) {
        const { type, routeName } = action
        const lastRoute = state.routes[state.routes.length - 1]
       // Toast.show(`current:${JSON.stringify(action,null,2)} last:${lastRoute.routeName}`,Toast.SHORT)
       //alert(`current:${JSON.stringify(action,null,2)} last:${lastRoute.routeName}`) 
       if (type == lastRoute.type && routeName == lastRoute.routeName) return state
    }
    return AppNavigator.router.getStateForAction(action, state)
};

export default navReducer;