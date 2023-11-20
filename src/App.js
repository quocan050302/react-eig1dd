import React, { useState, useEffect } from 'react';
import './style.css';
import { promise1, promise2 } from './api';

export default function App() {
  const [state, setState] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let data = [];
      const promises1 = Array.from({ length: 5 }, (_, i) => promise1(i + 1));
      const results1 = await Promise.all(promises1);

      for (let i = 0; i < results1.length; i++) {
        let res1 = results1[i];
        let res2 = await promise2(res1.id);
        data.push({ ...res1, ...res2 });
      }
      setState(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>{state ? 'Done' : 'Loading...'}</h1>
    </div>
  );
}
