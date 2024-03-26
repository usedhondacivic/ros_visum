function Preview() {
  return <p>GAZEBO</p>;
}

function Component() {
  return <p>GAZEBO</p>;
}

function Toolbar() {
  return <p>Toolbar!</p>;
}

export const panel = {
  component: Component,
  preview: Preview,
  toolbar: Toolbar,
  friendlyName: "Gazebo Sim",
};
