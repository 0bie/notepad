export default function tagItem({label}) {

  return (
    `<span class="btn btn--xs btn--tag btn--tag-${label}">
      <span class="btn-text">${label}</span>
    </span>`
  );

}
