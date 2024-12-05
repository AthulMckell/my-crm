import CrmDashboard from '@/components/crm-dashboard'

// export default function Home() {
//   return <CrmDashboard />
// }
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')
}