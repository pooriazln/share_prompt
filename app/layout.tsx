import {PropsWithChildren} from "react";
import {Navbar, Provider} from '@components'
import '@styles/global.css'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover & Share AI Powered Prompts'
}

const RootLayout = ({children}: PropsWithChildren) => {
    return (
        <html lang='en'>
        <body>
        <Provider>
            <div className="main">
                <div className="gradient"></div>
            </div>
            <main className="app">
                <Navbar/>
                {children}
            </main>
        </Provider>
        </body>
        </html>
    );
};

export default RootLayout;