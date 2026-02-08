import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function HomePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    redirect('/authenticated/dashboard');
  } else {
    redirect('/landing');
  }
}
