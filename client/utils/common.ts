export const navigateWithAllow = (
  router: ReturnType<typeof import("next/navigation").useRouter>,
  allow: () => void,
  path: string
) => {
  allow();
  router.push(path);
};
