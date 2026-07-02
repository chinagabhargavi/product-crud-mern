import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const API_URL =
    (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");

  const apiUrl = (path) => `${API_URL}${path}`;

  const softwareSuggestions = [
    "Adobe Photoshop",
    "Adobe Premiere Pro",
    "Android Studio",
    "Asana",
    "AutoCAD",
    "Canva",
    "Docker",
    "Figma",
    "GitHub",
    "Jira",
    "Notion",
    "Postman",
    "Slack",
    "Visual Studio Code",
    "Zoom"
  ];

  const softwareDetails = {
    "Adobe Photoshop": {
      category: "Design Tool",
      description:
        "Professional image editing and design software for creatives and marketing teams.",
      priceRange: "₹10,000 - ₹30,000"
    },
    "Adobe Premiere Pro": {
      category: "Video Editing Tool",
      description:
        "Advanced video editing and production software for filmmakers and content creators.",
      priceRange: "₹12,000 - ₹35,000"
    },
    "Android Studio": {
      category: "Developer Tool",
      description:
        "Official IDE for Android app development with emulator and debugging tools.",
      priceRange: "₹0 - ₹5,000"
    },
    "Asana": {
      category: "Project Management Tool",
      description:
        "Team collaboration and project tracking tool for planning and execution.",
      priceRange: "₹2,000 - ₹8,000"
    },
    "AutoCAD": {
      category: "Design Tool",
      description:
        "Industry-standard CAD software for drafting, design, and technical documentation.",
      priceRange: "₹15,000 - ₹45,000"
    },
    "Canva": {
      category: "Design Tool",
      description:
        "Easy drag-and-drop design platform for presentations, social media, and content.",
      priceRange: "₹500 - ₹5,000"
    },
    "Docker": {
      category: "DevOps Tool",
      description:
        "Container platform used to build, ship, and run applications consistently.",
      priceRange: "₹0 - ₹4,000"
    },
    "Figma": {
      category: "Design Tool",
      description:
        "Collaborative UI and UX design tool for interface prototyping and teamwork.",
      priceRange: "₹2,000 - ₹12,000"
    },
    "GitHub": {
      category: "Developer Tool",
      description:
        "Cloud-based platform for version control, collaboration, and code review.",
      priceRange: "₹0 - ₹6,000"
    },
    "Jira": {
      category: "Project Management Tool",
      description:
        "Issue tracking and agile project management tool for software teams.",
      priceRange: "₹2,500 - ₹10,000"
    },
    "Notion": {
      category: "Productivity Tool",
      description:
        "All-in-one workspace for notes, docs, tasks, and team knowledge management.",
      priceRange: "₹1,000 - ₹7,000"
    },
    "Postman": {
      category: "API Tool",
      description:
        "API development and testing tool for building and debugging requests.",
      priceRange: "₹0 - ₹5,000"
    },
    "Slack": {
      category: "Communication Tool",
      description:
        "Real-time messaging and collaboration platform for teams and organizations.",
      priceRange: "₹1,500 - ₹8,000"
    },
    "Visual Studio Code": {
      category: "Developer Tool",
      description:
        "Lightweight but powerful source code editor for modern development workflows.",
      priceRange: "₹0 - ₹3,000"
    },
    Zoom: {
      category: "Communication Tool",
      description:
        "Video conferencing and online meeting platform for remote collaboration.",
      priceRange: "₹500 - ₹6,000"
    }
  };

  const softwareCategories = [
    "Software",
    "Application",
    "Developer Tool",
    "AI Product",
    "Utility",
    "Cloud Service",
    "Design Tool",
    "Communication Tool"
  ];

  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [priceHint, setPriceHint] = useState("");
  const [editId, setEditId] = useState(null);

  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [sortOrder, setSortOrder] = useState("");

  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(apiUrl("/api/products"));
      setProducts(res.data);
    } catch (err) {
      showToast("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const reset = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setPriceHint("");
    setEditId(null);
  };

  const handleSelectSuggestion = (value) => {
    setName(value);
    const detail = softwareDetails[value];

    if (detail) {
      setCategory(detail.category || softwareCategoryMap[value] || "");
      setDescription(detail.description || "");
      setPriceHint(detail.priceRange ? `Suggested price range: ${detail.priceRange}` : "");
    } else {
      setCategory(softwareCategoryMap[value] || "");
      setPriceHint("");
    }

    setShowSuggestions(false);
  };

  const filteredSuggestions = useMemo(() => {
    return softwareSuggestions
      .filter((item) =>
        item.toLowerCase().includes(name.toLowerCase())
      )
      .sort((a, b) => a.localeCompare(b)); 
  }, [name]);

  const searchDropdownData = useMemo(() => {
    return products
      .map((p) => p.name)
      .sort((a, b) => a.localeCompare(b));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortOrder === "low-high") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high-low") {
      data.sort((a, b) => b.price - a.price);
    }

    return data;
  }, [products, search, sortOrder]);

  const addProduct = async () => {
    if (!name || !price || !category) {
      showToast("Fill all fields");
      return;
    }

    try {
      await axios.post(apiUrl("/api/products"), {
        name,
        price: Number(price),
        category,
        description
      });

      showToast("Product added");
      reset();
      fetchProducts();
    } catch {
      showToast("Failed to add product");
    }
  };

  const updateProduct = async () => {
    try {
      await axios.put(apiUrl(`/api/products/${editId}`), {
        name,
        price: Number(price),
        category,
        description
      });

      showToast("Updated");
      reset();
      fetchProducts();
    } catch {
      showToast("Update failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(apiUrl(`/api/products/${id}`));
      showToast("Deleted");
      fetchProducts();
    } catch {
      showToast("Delete failed");
    }
  };

  // ===== UI =====
  return (
    <div className="dark">
      <div className="container">

        <h1>💻 Software Products Management</h1>

        {toast && <div className="toast">{toast}</div>}

        <div className="form-box">
          <div className="field-group">
            <label className="field-label" htmlFor="product-name">Product Name</label>
            <div className="dropdown-wrapper">
              <input
                id="product-name"
                placeholder="📦 Product Name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  setName(value);
                  if (softwareDetails[value]) {
                    handleSelectSuggestion(value);
                  } else {
                    setShowSuggestions(true);
                    setPriceHint("");
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
              />

              {showSuggestions && (
                <div className="custom-dropdown">
                  {filteredSuggestions.map((item) => (
                    <div
                      key={item}
                      className="custom-dropdown-item"
                      onClick={() => handleSelectSuggestion(item)}
                    >
                      💻 {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="field-grid">
            <div className="field-group">
              <label className="field-label" htmlFor="product-price">Price</label>
              <input
                id="product-price"
                type="number"
                placeholder="💰 Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {priceHint && <div className="field-hint">💡 {priceHint}</div>}
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="product-category">Select Category</label>
              <select id="product-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">🏷️ Select Category</option>
                {softwareCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="product-description">Description</label>
            <textarea
              id="product-description"
              placeholder="📝 Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {editId ? (
            <button className="main-btn" onClick={updateProduct}>✏️ Update</button>
          ) : (
            <button className="main-btn" onClick={addProduct}>➕ Add</button>
          )}
        </div>

        {/* SEARCH + SORT BAR */}
        <div className="toolbar">
          <div className="toolbar-group">
            <input
              placeholder="🔍 Search Product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="dropdown-wrapper toolbar-dropdown">
              <button onClick={() => setShowSearchDropdown(!showSearchDropdown)}>
                ▼
              </button>

              {showSearchDropdown && (
                <div className="custom-dropdown">
                  {searchDropdownData.map((name) => (
                    <div
                      key={name}
                      className="custom-dropdown-item"
                      onClick={() => {
                        setSearch(name);
                        setShowSearchDropdown(false);
                      }}
                    >
                      💻 {name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>
        </div>

        {/* PRODUCT LIST */}
        {filteredProducts.map((p) => (
          <div key={p._id} className="product-card">

            <h3>💻 {p.name}</h3>
            <p>💰 ₹{p.price}</p>
            <p>🏷️ {p.category}</p>
            <p>{p.description}</p>

            <button onClick={() => {
              setName(p.name);
              setPrice(p.price);
              setCategory(p.category);
              setDescription(p.description);
              setEditId(p._id);
            }}>
              ✏️ Edit
            </button>

            <button onClick={() => deleteProduct(p._id)}>
              🗑️ Delete
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default App;