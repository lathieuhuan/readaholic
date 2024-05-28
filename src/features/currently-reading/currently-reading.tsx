import Image from 'next/image';

import { ObviousLink } from '@/components/ui/obvious-link';
import { BooksSearchInput } from '../books-search-input';

interface CurrentlyReadingProps {
  // t: 
}
export function CurrentlyReading() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold">Currently Reading</h3>
      <div className="flex items-center gap-2">
        <Image src={'/images/book-heart.svg'} alt="" width={49} height={68} />
        <span>What are you reading?</span>
      </div>

      <div>
        <BooksSearchInput />
      </div>

      <div className="flex gap-1 text-sm">
        <ObviousLink href={'recommendations'}>Recommendations</ObviousLink>
        <span>•</span>
        <ObviousLink href={'new-releases'}>New releases</ObviousLink>
      </div>
    </div>
  );
}
