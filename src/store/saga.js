import { fork } from 'redux-saga/effects'
import module1Saga from 'src/modules/module1/redux/saga'
export default function* rootSaga() {
  yield fork(module1Saga)
}
