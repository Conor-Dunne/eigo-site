export default function DisplayLevel({ level }) {
    let style = "text-white text-sm rounded-sm p-3 absolute bottom-0 left-0";

    let levelStyle = function(level) {
        switch (level) {
            case 1:
                return "bg-green-300";
            case 2:
                return "bg-blue-300";
            case 3:
                return "bg-red-300";
            default:
                return "bg-gray-300"; // Default style if level doesn't match 1, 2, or 3
        }
    };

    return (
        <p className={`${style} ${levelStyle(level)}`}> Level: {level}</p>
    );
}
