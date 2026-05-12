import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Nawasena' }, { name: 'description', content: 'Welcome to Nawasena!' }];
}

export default function Home() {
  return <Welcome />;
}
