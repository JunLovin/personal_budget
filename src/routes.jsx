import App from './App'
import Budget from '@pages/Budget'
import BudgetDetails from '@components/BudgetDetails'
import CreateEnvelope from '@pages/createEnvelope'
import Transfer from '@pages/Transfer'

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/envelopes',
                element: <Budget />,
                children: [
                    {
                        path: '/envelopes/:id',
                        element: <BudgetDetails />,
                    }
                ]
            },
            {
                path: '/envelopes/create',
                element: <CreateEnvelope />,
            },
            {
                path: '/transfer',
                element: <Transfer />
            }
        ]
    },
]

export default routes