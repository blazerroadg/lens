```

using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

public class SignatureGenerator
{
    public static void Main(string[] args)
    {
        string consumerId = "<<Your Consumer ID>>";
        string privateKeyVersion = "<<Your Key Version>>";
        string privateKey = "<<Your Private Key>>";
        long inTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

        var map = new Dictionary<string, string>
        {
            { "WM_CONSUMER.ID", consumerId },
            { "WM_CONSUMER.INTIMESTAMP", inTimestamp.ToString() },
            { "WM_SEC.KEY_VERSION", privateKeyVersion }
        };

        string[] array = Canonicalize(map);

        try
        {
            string data = GenerateSignature(privateKey, array[1]);
            Console.WriteLine("inTimestamp: " + inTimestamp);
            Console.WriteLine("Signature: " + data);
        }
        catch (Exception e)
        {
            Console.WriteLine("Error generating signature: " + e.Message);
        }
    }

    private static string GenerateSignature(string privateKey, string stringToSign)
    {
        using (var rsa = new RSACryptoServiceProvider())
        {
            rsa.FromXmlString(privateKey); // Make sure your privateKey is in XML format for C#
            byte[] dataToSign = Encoding.UTF8.GetBytes(stringToSign);
            var signatureBytes = rsa.SignData(dataToSign, CryptoConfig.MapNameToOID("SHA256"));
            return Convert.ToBase64String(signatureBytes);
        }
    }

    private static string[] Canonicalize(Dictionary<string, string> headersToSign)
    {
        var sortedKeys = new SortedDictionary<string, string>(headersToSign);
        StringBuilder canonicalizedStrBuffer = new StringBuilder();
        StringBuilder parameterNamesBuffer = new StringBuilder();

        foreach (var entry in sortedKeys)
        {
            parameterNamesBuffer.Append(entry.Key.Trim()).Append(";");
            canonicalizedStrBuffer.Append(entry.Value.Trim()).Append("\n");
        }

        return new[] { parameterNamesBuffer.ToString(), canonicalizedStrBuffer.ToString() };
    }
}

```


# Getting Started with Create React App

# LIVE DEMO
https://lens-20b4b.web.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
z
### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
