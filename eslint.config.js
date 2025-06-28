import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: eslintPluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // ���������� ������ (node:fs, node:path)
            "external", // ������� ����������� (react, lodash)
            "internal", // ���������� ���� (src/utils)
            "parent", // ������������ ���������� (../components)
            "sibling", // ������� ���������� (./styles)
            "index", // index-����� (./index)
            "object", // �������-������� (import * as React)
            "type", // ������� ����� (import type ...)
          ],
          "newlines-between": "always", // ������ ������ ����� ��������
          alphabetize: {
            // ���������� ������ �����
            order: "asc", // �� ����������� (a -> z)
            caseInsensitive: true, // ������������ �������
          },
        },
      ],
    },
  },
);
