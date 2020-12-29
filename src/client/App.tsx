import React, { useEffect, useState } from "react";

export default () => {
  return (
    <div>
      {false ? (
        <div>
          Signed in as {user.name}
          <button>Sign out</button>
        </div>
      ) : (
        <div>
          Not signed in
          <button>Sign in</button>
        </div>
      )}
    </div>
  );
};
