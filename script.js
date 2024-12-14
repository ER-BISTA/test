// Define the updated family structure with photos and bios
const familyData = {
    name: "Dhan Singh",
    bio: "Patriarch of the family, a respected elder.",
    photo: "https://via.placeholder.com/50", // Placeholder for photo
    children: [
        {
            name: "Ratan Singh",
            photo: "https://via.placeholder.com/50", // Placeholder for photo
            bio: "Eldest son of Dhan Singh, married to Amata Devi.",
            spouse: { name: "Amata Devi", photo: "https://via.placeholder.com/50", bio: "Wife of Ratan Singh." },
            children: [
                {
                    name: "Naresh Singh",
                    photo: "https://via.placeholder.com/50", // Placeholder for photo
                    bio: "Eldest son of Ratan Singh, married to Narayani Bista.",
                    spouse: { name: "Narayani Bista", photo: "https://via.placeholder.com/50", bio: "Wife of Naresh Singh." },
                    children: [
                        { name: "Nishan Bista", photo: "https://via.placeholder.com/50", bio: "Son of Naresh and Narayani." },
                        { name: "Rani Bista", photo: "https://via.placeholder.com/50", bio: "Daughter of Naresh and Narayani." }
                    ]
                },
                {
                    name: "Ram Singh", // Second child of Ratan Singh
                    photo: "https://via.placeholder.com/50", // Placeholder for photo
                    bio: "Second son of Ratan Singh, married to Janaki Bista.",
                    spouse: { name: "Janaki Bista", photo: "https://via.placeholder.com/50", bio: "Wife of Ram Singh." },
                    children: [
                        { name: "Diwash", photo: "https://via.placeholder.com/50", bio: "Son of Ram and Janaki." },
                        { name: "Diwani Bista", photo: "https://via.placeholder.com/50", bio: "Daughter of Ram and Janaki." }
                    ]
                },
                {
                    name: "Kalyan Singh",
                    photo: "https://via.placeholder.com/50", // Placeholder for photo
                    bio: "Third son of Ratan Singh, married to Kamala Bista.",
                    spouse: { name: "Kamala Bista", photo: "https://via.placeholder.com/50", bio: "Wife of Kalyan Singh." },
                    children: [
                        { name: "Yumin Bista", photo: "https://via.placeholder.com/50", bio: "Son of Kalyan and Kamala." }
                    ]
                },
                {
                    name: "Jaman Singh",
                    photo: "https://via.placeholder.com/50", // Placeholder for photo
                    bio: "Fourth son of Ratan Singh, married to Nisha Bista.",
                    spouse: { name: "Nisha Bista", photo: "https://via.placeholder.com/50", bio: "Wife of Jaman Singh." },
                    children: [
                        { name: "Niyam", photo: "https://via.placeholder.com/50", bio: "Son of Jaman and Nisha." }
                    ]
                }
            ]
        },
        {
            name: "Bir Singh",
            photo: "https://via.placeholder.com/50", // Placeholder for photo
            bio: "Second son of Dhan Singh.",
            children: [] // Bir Singh does not show family details
        },
        {
            name: "Ram Singh", // Third child of Dhan Singh
            photo: "https://via.placeholder.com/50", // Placeholder for photo
            bio: "Third son of Dhan Singh.",
            children: [] // No family details for Ram Singh
        }
    ]
};

// Set up the tree diagram dimensions
const width = 800;
const height = 600;

// Create the tree layout
const tree = d3.tree()
    .size([height, width - 160]);

const root = d3.hierarchy(familyData);

tree(root);

// Create SVG container for the tree diagram
const svg = d3.select("#tree")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(80,0)");

// Draw links between nodes
svg.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x)
    )
    .style("fill", "none")
    .style("stroke", "#ccc")
    .style("stroke-width", 2);

// Draw nodes
const node = svg.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .on("click", function(event, d) { showDetails(d); });

node.append("circle")
    .attr("r", 20)
    .style("fill", "#4CAF50");

node.append("text")
    .attr("dy", -25)
    .attr("x", 0)
    .style("text-anchor", "middle")
    .style("fill", "black")
    .style("font-size", "18px") // Larger font size for visibility
    .style("font-weight", "bold") // Bold font style
    .text(d => d.data.name);

// Show details when a node is clicked
function showDetails(d) {
    const detailsDiv = d3.select("#family-details");
    
    // Basic info for the person clicked
    let detailsHtml = `
        <h2>${d.data.name}</h2>
        <img src="${d.data.photo}" alt="${d.data.name}" style="width:100px; height:100px;"/>
        <p><strong>Bio:</strong> ${d.data.bio}</p>
    `;

    // Show spouse details
    if (d.data.spouse) {
        detailsHtml += `
            <h3>Spouse:</h3>
            <img src="${d.data.spouse.photo}" alt="${d.data.spouse.name}" style="width:80px; height:80px;"/>
            <p><strong>${d.data.spouse.name}</strong>: ${d.data.spouse.bio}</p>
        `;
    }

    // Show children details
    if (d.data.children && d.data.children.length > 0) {
        detailsHtml += "<h3>Children:</h3>";
        d.data.children.forEach(child => {
            detailsHtml += `
                <div>
                    <img src="${child.photo}" alt="${child.name}" style="width:80px; height:80px;"/>
                    <p><strong>${child.name}</strong>: ${child.bio}</p>
                </div>
            `;
        });
    }

    detailsDiv.html(detailsHtml);
}
