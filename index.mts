import { initKeyManager } from "@niveth/key-manager";

const rootAPIKey = process.env.KEY_MANAGER_ROOT_API_KEY;

if (!rootAPIKey) {
  throw new Error(
    "Set environment variable KEY_MANAGER_ROOT_API_KEY with root api key from key-manager.nivekithan.com"
  );
}

const {
  createUserAPIKey,
  addRoles,
  deleteUserAPIKey,
  removeRoles,
  rotateUserAPIKey,
  verifyUserAPIKey,
} = initKeyManager({
  rootAPIKey,
  endpoints: {
    TASK: {
      default: { maxReq: 100, duration: 60_000 },
      roles: {
        PRO_USER: { maxReq: 1000, duration: 60_000 },
      },
    },
  },
});

async function main() {
  const res = await createUserAPIKey("user", ["PRO_USER"]);

  console.log(res);
}

main();
