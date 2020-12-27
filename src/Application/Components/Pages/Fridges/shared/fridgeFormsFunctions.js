export const handleSetValue = (setName, setDescription) => (event) => {
  switch (event.target.name) {
    case "Name":
      setName(event.target.value);
      break;
    case "Description":
      setDescription(event.target.value);
      break;
    default:
      break;
  }
};
