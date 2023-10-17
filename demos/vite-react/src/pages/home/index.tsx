import { useState } from 'react';
import fireflyLogo from '../../assets/firefly.svg';
import './home.css';

function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="Appuid">
      <h1 className="tet12378">辅助前端开发</h1>
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={fireflyLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        本项目提供辅助前端开发功能，让普通的源码react、vue项目可以编辑，陆续会接入chatGPT，探索生成式落实到前端的方案，
        <br />
        本项目是在lowcode-engine基础上做的修改，如果想了解原理可先行看lowcode-engine文档
      </p>
    </div>
  );
}
export default Home;
