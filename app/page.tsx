import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="m-10 text-center">
        <Button>RBC GAMES</Button>

        <Button>Log out</Button>
        <Button>Update User</Button>
        <Link href="/join/sign-in">Log In</Link>
      </div>
    </>
  );
}
