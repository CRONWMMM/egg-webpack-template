// styles
import '../less/home.less';

const isDev = process.env.NODE_ENV === 'development';


async function welcome() {
  const res = await sayHello();
  console.log(res);
}

function sayHello() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hello world');
    }, 2000);
  });
}

welcome();
