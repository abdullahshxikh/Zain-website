import { redirect } from 'next/navigation';

export default function CustomerIdentityLogoutCatchAll() {
  redirect('/logout');
}

