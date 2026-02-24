import { Layout } from './components/layout';
import { Hero, About, Projects, Experience, Contact } from './components/sections';

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  );
}

export default App;
