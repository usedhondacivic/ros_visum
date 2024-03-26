function Preview() {
  return <p>IMAGE</p>;
}

function Component() {
  return <p>IMAGE</p>;
}

function Toolbar() {
  return <p>Toolbar!</p>;
}

export const panel = {
  component: Component,
  preview: Preview,
  toolbar: Toolbar,
  friendlyName: "Image",
};
