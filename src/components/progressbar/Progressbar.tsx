import { Progress } from "antd";
import { ProgressbarProps } from "../../types/types";

const Progressbar: React.FunctionComponent<ProgressbarProps> = ({progress}) => {
    return (
        <Progress style={{width: 0, marginLeft: 10}} percent={progress} percentPosition={{ align: 'center', type: 'inner' }} size={[400, 20]} />
    );
}
 
export default Progressbar;