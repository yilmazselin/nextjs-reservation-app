import IcoMoon from "react-icomoon";
import iconSet from "../../../../assets/icons/selection.json";

function Icon(props) {
  return (
    <IcoMoon
      disableFill={true}
      data-testid="svg-icon"
      iconSet={iconSet}
      {...props}
    />
  );
}
export default Icon;
