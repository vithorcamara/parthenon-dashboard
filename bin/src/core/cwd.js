export default function Init() {

    // Try OS Current Working Directory.
    const oscwd = os.getcwd()[0];
    if (os.readdir(oscwd)[0].includes("XMB")) {
        return ((oscwd.endsWith('/')) ? oscwd : (oscwd + "/"));
    }

    const devices = System.devices();

    for (let i = 0; i < devices.length; i++) {
        const device = devices[i];
        switch (device.name) {
            case "mass":
                for (let j = 0; j < 10; j++) {
                    const root = `mass${j.toString()}:`;
                    const bdm = System.getBDMInfo(root);
                    if (!bdm) { break; }
                    const dir = os.readdir(root)[0];
                    if (dir.includes("XMB")) {
                        return root;
                    } else if (dir.includes("OSDXMB")) {
                        if (os.readdir(`${root}OSDXMB/`)[0].includes("XMB")) {
                            return `${root}OSDXMB/`;
                        }
                    }
                }
                break;
            case "mmce":
                for (let j = 0; j < 2; j++) {
                    const root = `mmce${j.toString()}:/`;
                    const dir = os.readdir(root)[0];
                    if (dir.includes("XMB")) {
                        return root;
                    } else if (dir.includes("OSDXMB")) {
                        if (os.readdir(`${root}OSDXMB/`)[0].includes("XMB")) {
                            return `${root}OSDXMB/`;
                        }
                    }
                }
                break;
            case "hdd":
                System.mount("pfs0:", "hdd0:__common");
                if (os.readdir("pfs0:/").includes("OSDXMB")) { return "pfs0:/OSDXMB/"; }
                System.umount("pfs0:");
                break;
        }
    }

	// Lastly, try MC directories as last resource.
    if (os.readdir("mc0:/")[0].includes("OSDXMB")) {
        if (os.readdir("mc0:/OSDXMB/")[0].includes("XMB")) {
            return "mc0:/OSDXMB/";
        }
    }
    else if (os.readdir("mc1:/")[0].includes("OSDXMB")) {
        if (os.readdir("mc1:/OSDXMB/")[0].includes("XMB")) {
            return "mc1:/OSDXMB/";
        }
    }

	throw new Error("System Assets not Found.");
	return "./";
}