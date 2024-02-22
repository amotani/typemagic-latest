import { styles } from "@/styles";

export const Copy = (props: { fill?: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={props.fill ? props.fill : styles.iconFill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="24 / basic / copy">
        <path
          id="icon"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 2H20C21.1523 2 22 2.84772 22 4V14C22 15.1523 21.1523 16 20 16H16V20C16 21.1523 15.1523 22 14 22H4C2.84772 22 2 21.1523 2 20V10C2 8.84772 2.84772 8 4 8H8V4C8 2.84772 8.84772 2 10 2ZM8 10H4V20H14V16H10C8.84772 16 8 15.1523 8 14V10ZM10 4V14H20V4H10Z"
        />
      </g>
    </svg>
  );
};

export const CheckMark = (props: { fill?: string }) => (
  <svg
    fill={props.fill ? props.fill : styles.iconFill}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.70711 14.2929L19 5L20.4142 6.41421L9.70711 17.1213L4 11.4142L5.41421 10L9.70711 14.2929Z"
    />
  </svg>
);

export const Stop = (props: { fill?: string }) => (
  <svg
    fill={props.fill ? props.fill : styles.iconFill}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="24 / music / player-stop">
      <path
        id="icon"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2ZM4 20V4H20V20H4Z"
      />
    </g>
  </svg>
);

export const At = (props: { fill?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={props.fill ? props.fill : styles.iconFill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="24 / symbols / at-sign">
      <path
        id="icon"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.9994 7H16.9994V12C16.9994 14.4709 17.1889 15 17.9994 15C19.3037 15 19.9994 14.3832 19.9994 12C19.9994 6.71065 17.3465 4 11.9996 4C8.53551 4.00044 5.46529 6.23026 4.39328 9.52426C3.32127 12.8182 4.49105 16.428 7.29132 18.4671C10.0916 20.5062 13.8861 20.5114 16.692 18.48L17.8649 20.1C14.3575 22.6393 9.61437 22.6328 6.11402 20.0839C2.61367 17.5349 1.15145 13.0228 2.49146 8.90532C3.83147 4.78783 7.66925 2.00054 11.9994 2C18.4608 2 21.9994 5.6156 21.9994 12C21.9994 15.5449 20.3583 17 17.9994 17C16.6556 17 15.8865 16.5667 15.4643 15.6048C14.5656 16.4688 13.3445 17 11.9994 17C9.238 17 6.99943 14.7614 6.99943 12C6.99943 9.23858 9.238 7 11.9994 7C13.125 7 14.1638 7.37194 14.9994 7.99963V7ZM14.9994 12C14.9994 13.6569 13.6563 15 11.9994 15C10.3426 15 8.99943 13.6569 8.99943 12C8.99943 10.3431 10.3426 9 11.9994 9C13.6563 9 14.9994 10.3431 14.9994 12Z"
      />
    </g>
  </svg>
);

export const Lightning = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={props.fill ? props.fill : styles.iconFill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.61304 10H6.00012V15.2339L13.3872 6.00003H10.0001V0.766174L2.61304 10ZM7.33345 8.6667H5.3872L8.66679 4.56722V7.33336H10.613L7.33345 11.4328V8.6667Z"
    />
  </svg>
);

export const ChevronRight = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={props.fill ? props.fill : styles.iconFill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.72375 7.99999L4.86182 3.13806L5.80463 2.19525L11.6094 7.99999L5.80463 13.8047L4.86182 12.8619L9.72375 7.99999Z"
    />
  </svg>
);

export const X = (props: { fill?: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill={props.fill ? props.fill : styles.iconFill}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.00008 9.41423L3.70718 13.7071L2.29297 12.2929L6.58586 8.00001L2.29297 3.70712L3.70718 2.29291L8.00008 6.5858L12.293 2.29291L13.7072 3.70712L9.41429 8.00001L13.7072 12.2929L12.293 13.7071L8.00008 9.41423Z"
    />
  </svg>
);

export const Chat = (props: { fill?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.75 15.75L11.475 14.325C11.475 14.325 10.5635 15 8.625 15C5.10418 15 2.25 12.1458 2.25 8.625C2.25 5.10418 5.10418 2.25 8.625 2.25C12.1458 2.25 15 5.10418 15 8.625C15 10.5 14.325 11.475 14.325 11.475L15.75 15.75Z"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-opacity="1.0"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Magnifying = (props: { fill?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 15L11.8525 11.8525M13.5 7.875C13.5 4.7684 10.9816 2.25 7.875 2.25C4.7684 2.25 2.25 4.7684 2.25 7.875C2.25 10.9816 4.7684 13.5 7.875 13.5C10.9816 13.5 13.5 10.9816 13.5 7.875Z"
      stroke="black"
      stroke-opacity="1.0"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Heart = (props: { fill?: string; isActive?: boolean }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill={props.isActive ? styles.heartFill : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.24855 9.03553L9 15L14.7514 9.03553C15.3908 8.37249 15.75 7.47322 15.75 6.53553C15.75 4.58291 14.2236 3 12.3407 3C11.4365 3 10.5694 3.37249 9.93002 4.03553L9 5L8.06998 4.03553C7.43062 3.37249 6.56346 3 5.65926 3C3.77638 3 2.25 4.58291 2.25 6.53553C2.25 7.47322 2.60919 8.37249 3.24855 9.03553Z"
      stroke={
        props.isActive
          ? styles.heartFill
          : props.fill
          ? props.fill
          : styles.iconFill
      }
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Cross = (props: { fill?: string }) => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9064 3.75L4.4064 14.25M4.40641 3.75L14.9064 14.25"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Question = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00001 12.6666V12.6599M7.99998 10.6666C7.99998 7.66659 10.6666 8.33325 10.6666 5.99992C10.6666 4.52716 9.47274 3.33325 7.99998 3.33325C6.75742 3.33325 5.71336 4.1831 5.41733 5.33325"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Clock = (props: { fill?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 8V12L14.5 14M21.5 12C21.5 16.9706 17.4706 21 12.5 21C7.52944 21 3.5 16.9706 3.5 12C3.5 7.02944 7.52944 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12Z"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Eye = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.00001 3.33325C3.75759 3.33325 1.33334 7.99992 1.33334 7.99992C1.33334 7.99992 3.75759 12.6666 8.00001 12.6666C12.2424 12.6666 14.6667 7.99992 14.6667 7.99992C14.6667 7.99992 12.2424 3.33325 8.00001 3.33325Z"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.00001 9.99992C9.10458 9.99992 10 9.10449 10 7.99992C10 6.89535 9.10458 5.99992 8.00001 5.99992C6.89544 5.99992 6.00001 6.89535 6.00001 7.99992C6.00001 9.10449 6.89544 9.99992 8.00001 9.99992Z"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Refresh = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.6599 9.99369C13.2276 11.2206 12.4082 12.2738 11.3253 12.9946C10.2423 13.7154 8.95443 14.0647 7.65565 13.99C6.35687 13.9153 5.11756 13.4205 4.12445 12.5802C3.13135 11.7399 2.43825 10.5997 2.14959 9.33127C1.86092 8.06286 1.99233 6.735 2.52401 5.54776C3.05569 4.36053 3.95884 3.37823 5.09739 2.74888C6.23593 2.11952 7.54818 1.87721 8.83642 2.05844C11.0114 2.36443 12.4484 3.94087 14 5.33325M14 5.33325V1.33325M14 5.33325H10"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Profile = (props: { fill?: string; width?: number }) => (
  <svg
    width={props.width ? props.width : 24}
    height={props.width ? props.width : 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 18.7083C18 17.0886 16.8283 15 15 15H9C7.17172 15 6 17.0886 6 18.7083M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z"
      stroke={props.fill ? props.fill : styles.iconFill}
    />
  </svg>
);

export const Home = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 10L12 3L19 10L19 20H5L5 10Z"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ArrowRight = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.3333 8L2.66663 8M13.3333 8L9.33329 12M13.3333 8L9.33329 4"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Globe = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 8C14 11.3137 11.3137 14 8 14M14 8C14 4.68629 11.3137 2 8 2M14 8H2M8 14C4.68629 14 2 11.3137 2 8M8 14C8 14 10.6667 12 10.6667 8C10.6667 4 8 2 8 2M8 14C8 14 5.33333 12 5.33333 8C5.33333 4 8 2 8 2M2 8C2 4.68629 4.68629 2 8 2"
      stroke={props.fill ? props.fill : styles.iconFill}
    />
  </svg>
);

export const Lock = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.33325 7.33333V4.66667C5.33325 3.77778 5.86659 2 7.99992 2C10.1333 2 10.6666 3.77778 10.6666 4.66667V7.33333M5.33325 7.33333H3.33325V14H12.6666V7.33333H10.6666M5.33325 7.33333H10.6666"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Settings = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 3H13C13.5523 3 14 3.44772 14 4V4.56879C14 4.99659 14.2871 5.36825 14.6822 5.53228C15.0775 5.69638 15.5377 5.63384 15.8403 5.33123L16.2426 4.92891C16.6331 4.53838 17.2663 4.53838 17.6568 4.92891L19.071 6.34312C19.4616 6.73365 19.4615 7.36681 19.071 7.75734L18.6688 8.1596C18.3661 8.46223 18.3036 8.92247 18.4677 9.31774C18.6317 9.71287 19.0034 10 19.4313 10L20 10C20.5523 10 21 10.4477 21 11V13C21 13.5523 20.5523 14 20 14H19.4312C19.0034 14 18.6318 14.2871 18.4677 14.6822C18.3036 15.0775 18.3661 15.5377 18.6688 15.8403L19.071 16.2426C19.4616 16.6331 19.4616 17.2663 19.071 17.6568L17.6568 19.071C17.2663 19.4616 16.6331 19.4616 16.2426 19.071L15.8403 18.6688C15.5377 18.3661 15.0775 18.3036 14.6822 18.4677C14.2871 18.6318 14 19.0034 14 19.4312V20C14 20.5523 13.5523 21 13 21H11C10.4477 21 10 20.5523 10 20V19.4313C10 19.0034 9.71287 18.6317 9.31774 18.4677C8.92247 18.3036 8.46223 18.3661 8.1596 18.6688L7.75732 19.071C7.36679 19.4616 6.73363 19.4616 6.34311 19.071L4.92889 17.6568C4.53837 17.2663 4.53837 16.6331 4.92889 16.2426L5.33123 15.8403C5.63384 15.5377 5.69638 15.0775 5.53228 14.6822C5.36825 14.2871 4.99659 14 4.56879 14H4C3.44772 14 3 13.5523 3 13V11C3 10.4477 3.44772 10 4 10L4.56877 10C4.99658 10 5.36825 9.71288 5.53229 9.31776C5.6964 8.9225 5.63386 8.46229 5.33123 8.15966L4.92891 7.75734C4.53838 7.36681 4.53838 6.73365 4.92891 6.34313L6.34312 4.92891C6.73365 4.53839 7.36681 4.53839 7.75734 4.92891L8.15966 5.33123C8.46228 5.63386 8.9225 5.6964 9.31776 5.53229C9.71288 5.36825 10 4.99658 10 4.56876V4C10 3.44772 10.4477 3 11 3Z"
      stroke={props.fill ? props.fill : styles.iconFill}
    />
    <path
      d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
      stroke={props.fill ? props.fill : styles.iconFill}
    />
  </svg>
);

export const Plus = (props: { fill?: string }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12H20M12 4V20"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const Trash = (props: { fill?: string }) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 10V16M14.5 10V16M18.5 6V18C18.5 19.1046 17.6046 20 16.5 20H8.5C7.39543 20 6.5 19.1046 6.5 18V6M4.5 6H20.5M15.5 6V5C15.5 3.89543 14.6046 3 13.5 3H11.5C10.3954 3 9.5 3.89543 9.5 5V6"
      stroke={props.fill ? props.fill : styles.iconFill}
      stroke-opacity="0.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const TypemagicSymbol = () => (
  <svg
    width="25"
    height="23"
    viewBox="0 0 25 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3229 0.41983L1.34417 19.4355H23.3016L12.3229 0.41983Z"
      fill="black"
    />
    <circle
      cx="4.43699"
      cy="4.43699"
      r="4.43699"
      transform="matrix(-1 0 0 1 16.7852 8.63461)"
      fill="white"
    />
  </svg>
);

export const BigTypemagicSymbol = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3229 0.41983L1.34417 19.4355H23.3016L12.3229 0.41983Z"
      fill="black"
    />
    <circle
      cx="4.43699"
      cy="4.43699"
      r="4.43699"
      transform="matrix(-1 0 0 1 16.7852 8.63461)"
      fill="white"
    />
  </svg>
);
