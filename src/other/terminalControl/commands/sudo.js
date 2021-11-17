import color from "../color";

export default function () {
    return `guest is not in the sudoers file. ${color.redBright}This incident will be reported.${color.reset}`;
}