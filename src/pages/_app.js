import '@/app/globals.css'
import {store} from '../store/store'
import { Provider } from 'react-redux'

function myApp({Component, pagePros}) {
  return (
    <Provider store={store}>
      <main className="h-full bg-white">
        <Component {...pagePros} />
      </main>
    </Provider>
  )
}

export default myApp