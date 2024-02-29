import { FC } from "react";

export const IconButtonSave = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="currentColor"
      className="bi bi-floppy me-2"
      viewBox="0 0 16 16"
    >
      <path d="M11 2H9v3h2V2Z"></path>
      <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z"></path>
    </svg>
  );
};

export const IconFolder = () => {
  return (
    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
      <path
        d="M13.5 4.93561H11.8125V3.16061C11.8125 2.88405 11.5891 2.66061 11.3125 2.66061H6.39062L4.55781 0.907483C4.53449 0.885651 4.50382 0.873382 4.47188 0.873108H0.5C0.223437 0.873108 0 1.09655 0 1.37311V10.6231C0 10.8997 0.223437 11.1231 0.5 11.1231H11.4062C11.6094 11.1231 11.7937 10.9997 11.8703 10.8106L13.9641 5.62311C13.9875 5.56373 14 5.49967 14 5.43561C14 5.15905 13.7766 4.93561 13.5 4.93561ZM1.125 1.99811H4.07031L5.93906 3.78561H10.6875V4.93561H2.71875C2.51562 4.93561 2.33125 5.05905 2.25469 5.24811L1.125 8.04811V1.99811ZM11.0516 9.99811H1.48438L3.09844 5.99811H12.6672L11.0516 9.99811Z"
        fill="#6C757D"
      ></path>
    </svg>
  );
};

export const IconThinFile: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className && className} mh-50px`}
    >
      <path
        d="M11.3536 3.50938L7.99111 0.146875C7.89736 0.053125 7.7708 0 7.63799 0H1.00049C0.723926 0 0.500488 0.223437 0.500488 0.5V13.5C0.500488 13.7766 0.723926 14 1.00049 14H11.0005C11.2771 14 11.5005 13.7766 11.5005 13.5V3.86406C11.5005 3.73125 11.4474 3.60313 11.3536 3.50938ZM10.3474 4.09375H7.40674V1.15313L10.3474 4.09375ZM10.3755 12.875H1.62549V1.125H6.34424V4.5C6.34424 4.67405 6.41338 4.84097 6.53645 4.96404C6.65952 5.08711 6.82644 5.15625 7.00049 5.15625H10.3755V12.875Z"
        fill="#6C757D"
      ></path>
    </svg>
  );
};

export const IconBack = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.99988 2.14552V20.783C2.99988 20.9036 3.09631 21 3.21416 21H4.82131C4.93916 21 5.03559 20.9036 5.03559 20.783V2.14552C5.03559 2.02499 4.93916 1.92856 4.82131 1.92856H3.21416C3.09631 1.92856 2.99988 2.02499 2.99988 2.14552ZM8.00881 11.2955C7.98319 11.3156 7.96248 11.3412 7.94824 11.3704C7.93399 11.3997 7.92659 11.4318 7.92659 11.4643C7.92659 11.4968 7.93399 11.5289 7.94824 11.5581C7.96248 11.5874 7.98319 11.613 8.00881 11.633L11.8043 14.633C11.8359 14.6578 11.8738 14.6731 11.9137 14.6773C11.9536 14.6815 11.9939 14.6744 12.0299 14.6568C12.066 14.6392 12.0963 14.6118 12.1175 14.5778C12.1388 14.5437 12.15 14.5044 12.1499 14.4643V12.4848H21.2142C21.332 12.4848 21.4284 12.3884 21.4284 12.2705V10.6634C21.4284 10.5455 21.332 10.4491 21.2142 10.4491H12.1526V8.46427C12.1526 8.28481 11.9463 8.1857 11.807 8.29552L8.00881 11.2955Z"
        fill="#343A40"
      />
    </svg>
  );
};
export const IconMedicine = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-capsule"
      viewBox="0 0 16 16"
    >
      <path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429z" />
    </svg>
  );
};

export const IconMenu = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.875 2.1875C0.875 1.8394 1.01328 1.50556 1.25942 1.25942C1.50556 1.01328 1.8394 0.875 2.1875 0.875H4.8125C5.1606 0.875 5.49444 1.01328 5.74058 1.25942C5.98672 1.50556 6.125 1.8394 6.125 2.1875V4.8125C6.125 5.1606 5.98672 5.49444 5.74058 5.74058C5.49444 5.98672 5.1606 6.125 4.8125 6.125H2.1875C1.8394 6.125 1.50556 5.98672 1.25942 5.74058C1.01328 5.49444 0.875 5.1606 0.875 4.8125V2.1875ZM7.875 2.1875C7.875 1.8394 8.01328 1.50556 8.25942 1.25942C8.50556 1.01328 8.8394 0.875 9.1875 0.875H11.8125C12.1606 0.875 12.4944 1.01328 12.7406 1.25942C12.9867 1.50556 13.125 1.8394 13.125 2.1875V4.8125C13.125 5.1606 12.9867 5.49444 12.7406 5.74058C12.4944 5.98672 12.1606 6.125 11.8125 6.125H9.1875C8.8394 6.125 8.50556 5.98672 8.25942 5.74058C8.01328 5.49444 7.875 5.1606 7.875 4.8125V2.1875ZM0.875 9.1875C0.875 8.8394 1.01328 8.50556 1.25942 8.25942C1.50556 8.01328 1.8394 7.875 2.1875 7.875H4.8125C5.1606 7.875 5.49444 8.01328 5.74058 8.25942C5.98672 8.50556 6.125 8.8394 6.125 9.1875V11.8125C6.125 12.1606 5.98672 12.4944 5.74058 12.7406C5.49444 12.9867 5.1606 13.125 4.8125 13.125H2.1875C1.8394 13.125 1.50556 12.9867 1.25942 12.7406C1.01328 12.4944 0.875 12.1606 0.875 11.8125V9.1875ZM7.875 9.1875C7.875 8.8394 8.01328 8.50556 8.25942 8.25942C8.50556 8.01328 8.8394 7.875 9.1875 7.875H11.8125C12.1606 7.875 12.4944 8.01328 12.7406 8.25942C12.9867 8.50556 13.125 8.8394 13.125 9.1875V11.8125C13.125 12.1606 12.9867 12.4944 12.7406 12.7406C12.4944 12.9867 12.1606 13.125 11.8125 13.125H9.1875C8.8394 13.125 8.50556 12.9867 8.25942 12.7406C8.01328 12.4944 7.875 12.1606 7.875 11.8125V9.1875Z"
        fill="#1A5E83"
      />
    </svg>
  );
};

export const IconDoubleCheck = () => {
  return (
    <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.96991 0.970043C7.11078 0.835932 7.29824 0.76179 7.49273 0.763262C7.68722 0.764733 7.87354 0.841704 8.01236 0.977931C8.15118 1.11416 8.23165 1.29899 8.23679 1.49342C8.24193 1.68785 8.17134 1.87667 8.03991 2.02004L4.04991 7.01004C3.9813 7.08394 3.8985 7.14325 3.80645 7.18441C3.71439 7.22557 3.61498 7.24775 3.51416 7.24962C3.41334 7.25149 3.31318 7.233 3.21967 7.19528C3.12616 7.15755 3.04121 7.10135 2.96991 7.03004L0.323913 4.38404C0.250226 4.31538 0.191124 4.23258 0.150132 4.14058C0.10914 4.04858 0.0870986 3.94927 0.0853218 3.84857C0.083545 3.74786 0.10207 3.64783 0.139791 3.55445C0.177512 3.46106 0.233656 3.37622 0.304875 3.30501C0.376094 3.23379 0.460928 3.17764 0.554316 3.13992C0.647704 3.1022 0.747733 3.08367 0.848436 3.08545C0.949139 3.08723 1.04845 3.10927 1.14045 3.15026C1.23245 3.19125 1.31525 3.25036 1.38391 3.32404L3.47791 5.41704L6.94991 0.992043C6.95614 0.984323 6.96282 0.976976 6.96991 0.970043ZM6.04991 6.11004L6.96991 7.03004C7.0412 7.1012 7.12608 7.15726 7.2195 7.1949C7.31292 7.23253 7.41296 7.25097 7.51366 7.2491C7.61436 7.24723 7.71365 7.22511 7.80561 7.18403C7.89757 7.14296 7.98032 7.08379 8.04891 7.01004L12.0409 2.02004C12.1126 1.94924 12.1693 1.86472 12.2077 1.77152C12.246 1.67832 12.2651 1.57835 12.2639 1.47758C12.2628 1.37682 12.2413 1.27732 12.2008 1.18504C12.1603 1.09276 12.1017 1.00958 12.0283 0.940472C11.955 0.871365 11.8685 0.817747 11.7739 0.782819C11.6794 0.747891 11.5788 0.732371 11.4782 0.737184C11.3775 0.741998 11.2789 0.767047 11.1881 0.810835C11.0973 0.854623 11.0163 0.916253 10.9499 0.992043L7.47691 5.41704L6.99191 4.93104L6.04891 6.11004H6.04991Z"
        fill="white"
      />
    </svg>
  );
};

export const IconHome = () => {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.6875 12.6874V9.62055C4.6875 9.40618 4.90625 9.18743 5.125 9.18743H6.875C7.09375 9.18743 7.3125 9.40618 7.3125 9.62493V12.6874C7.3125 12.8035 7.35859 12.9147 7.44064 12.9968C7.52269 13.0788 7.63397 13.1249 7.75 13.1249H11.25C11.366 13.1249 11.4773 13.0788 11.5594 12.9968C11.6414 12.9147 11.6875 12.8035 11.6875 12.6874V6.56243C11.6876 6.50494 11.6764 6.44799 11.6545 6.39484C11.6325 6.34169 11.6004 6.29338 11.5598 6.25268L10.375 5.0688V2.18743C10.375 2.0714 10.3289 1.96012 10.2469 1.87807C10.1648 1.79602 10.0535 1.74993 9.9375 1.74993H9.0625C8.94647 1.74993 8.83519 1.79602 8.75314 1.87807C8.67109 1.96012 8.625 2.0714 8.625 2.18743V3.3188L6.30975 1.00268C6.26911 0.961935 6.22083 0.92961 6.16768 0.907554C6.11453 0.885498 6.05755 0.874146 6 0.874146C5.94246 0.874146 5.88547 0.885498 5.83232 0.907554C5.77917 0.92961 5.73089 0.961935 5.69025 1.00268L0.440251 6.25268C0.399649 6.29338 0.367468 6.34169 0.345548 6.39484C0.323628 6.44799 0.312398 6.50494 0.312501 6.56243V12.6874C0.312501 12.8035 0.358594 12.9147 0.440641 12.9968C0.522689 13.0788 0.633969 13.1249 0.750001 13.1249H4.25C4.36603 13.1249 4.47731 13.0788 4.55936 12.9968C4.64141 12.9147 4.6875 12.8035 4.6875 12.6874Z"
        fill="#1A5E83"
      />
    </svg>
  );
};

export const IconCabinet = () => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="14" height="14" fill="#E5E5E5" />
      <rect width="1280" height="832" transform="translate(-57 -237)" fill="#F0F2F5" />
      <g clip-path="url(#clip0_7522_1252)">
        <rect width="260" height="623" transform="translate(-57 -124)" fill="white" />
        <g clip-path="url(#clip1_7522_1252)">
          <g clip-path="url(#clip2_7522_1252)">
            <path
              d="M11.0626 13.125C12.2316 13.125 13.125 12.1144 13.125 10.9375V4.375H0.875V10.9375C0.875 12.1144 1.76838 13.125 2.93738 13.125H11.0626ZM4.8125 6.125H9.1875C9.30353 6.125 9.41481 6.17109 9.49686 6.25314C9.57891 6.33519 9.625 6.44647 9.625 6.5625C9.625 6.67853 9.57891 6.78981 9.49686 6.87186C9.41481 6.95391 9.30353 7 9.1875 7H4.8125C4.69647 7 4.58519 6.95391 4.50314 6.87186C4.42109 6.78981 4.375 6.67853 4.375 6.5625C4.375 6.44647 4.42109 6.33519 4.50314 6.25314C4.58519 6.17109 4.69647 6.125 4.8125 6.125ZM0.7 0.875C0.514348 0.875 0.336301 0.94875 0.205025 1.08003C0.0737498 1.2113 0 1.38935 0 1.575L0 2.625C0 2.81065 0.0737498 2.9887 0.205025 3.11997C0.336301 3.25125 0.514348 3.325 0.7 3.325H13.3C13.4857 3.325 13.6637 3.25125 13.795 3.11997C13.9262 2.9887 14 2.81065 14 2.625V1.575C14 1.38935 13.9262 1.2113 13.795 1.08003C13.6637 0.94875 13.4857 0.875 13.3 0.875H0.7Z"
              fill="#6C757D"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_7522_1252">
          <rect width="260" height="623" fill="white" transform="translate(-57 -124)" />
        </clipPath>
        <clipPath id="clip1_7522_1252">
          <rect width="260" height="72" fill="white" transform="translate(-57 -5)" />
        </clipPath>
        <clipPath id="clip2_7522_1252">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
